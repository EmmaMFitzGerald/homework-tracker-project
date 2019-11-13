class HomeworksController < ApplicationController
  before_action :set_homework, only: [:show, :update, :destroy]

  # GET /homeworks
  def index
    @homeworks = Homework.all

    render json: @homeworks
  end

  # GET /homeworks/1
  def show
    render json: @homework
  end

  # POST /homeworks
  def create
    @homework = Homework.new(homework_params)

    if @homework.save
      render json: @homework, status: :created, location: @homework
    else
      render json: @homework.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /homeworks/1
  def update
    if @homework.update(homework_params)
      render json: @homework
    else
      render json: @homework.errors, status: :unprocessable_entity
    end
  end

  # DELETE /homeworks/1
  def destroy
    @homework.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_homework
      @homework = Homework.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def homework_params
      params.require(:homework).permit(:content, :due_date, :compleytion)
    end
end
